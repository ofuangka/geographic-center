package ofuangka.geographiccenter.api.resource;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.codec.binary.StringUtils;

import ofuangka.geographiccenter.api.dao.GroupDao;
import ofuangka.geographiccenter.api.dao.MemberDao;
import ofuangka.geographiccenter.api.domain.Member;
import ofuangka.geographiccenter.api.security.SecurityService;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class MemberCollectionResource {

	@Context
	private ResourceContext context;

	@Inject
	private MemberDao memberDao;

	@Inject
	private SecurityService securityService;
	
	@Inject
	private GroupDao groupDao;

	@GET
	public List<Member> list(@QueryParam("gid") String groupId) {
		return memberDao.getByGroupId(groupId);
	}

	@POST
	public Member create(@Valid Member member) {
		String groupId = member.getGroupId();
		
		/* only add members to groups that exist */
		if (groupDao.get(groupId) != null) {
			
			String userId = securityService.getUserId();
			String username = securityService.getUsername();
			Date now = Calendar.getInstance().getTime();
	
			/* a member can only appear in a group once */
			Member existingMember = getMemberWithUserId(userId, groupId);
			if (existingMember == null) {
				member.setUserId(userId);
				member.setUsername(username);
				member.setGroupId(groupId);
				member.setLastUpdatedTs(now);
				return memberDao.create(member);
			} else {
				existingMember.setUsername(username);
				existingMember.setLat(member.getLat());
				existingMember.setLng(member.getLng());
				existingMember.setLastUpdatedTs(now);
				return memberDao.update(existingMember);
			}
		} else {
			throw new SecurityException("Group does not exist");
		}
	}

	@Path("/{memberId}")
	public MemberInstanceResource getMemberInstanceResource() {
		return context.getResource(MemberInstanceResource.class);
	}

	private Member getMemberWithUserId(String userId, String groupId) {
		Member ret = null;
		List<Member> members = memberDao.getByGroupId(groupId);
		for (Member member : members) {
			if (StringUtils.equals(userId, member.getUserId())) {
				ret = member;
				break;
			}
		}
		return ret;
	}
}
