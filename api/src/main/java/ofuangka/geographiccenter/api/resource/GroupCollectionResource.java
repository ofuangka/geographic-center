package ofuangka.geographiccenter.api.resource;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

import ofuangka.geographiccenter.api.dao.GroupDao;
import ofuangka.geographiccenter.api.dao.MemberDao;
import ofuangka.geographiccenter.api.domain.Group;
import ofuangka.geographiccenter.api.domain.Member;
import ofuangka.geographiccenter.api.security.SecurityService;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class GroupCollectionResource {

	@Context
	private ResourceContext context;

	@Inject
	private GroupDao groupDao;

	@Inject
	private SecurityService securityService;

	@Inject
	private MemberDao memberDao;

	@GET
	public List<Group> list(@QueryParam("own") boolean isOwn) {
		if (isOwn) {
			Set<Group> set = new HashSet<Group>();

			String userId = securityService.getUserId();

			// get all the groups that the user has created
			set.addAll(groupDao.getCreatedByUserId(userId));

			// add all the groups that the user is a member of
			List<Member> members = memberDao.getByUserId(userId);

			for (Member member : members) {
				set.add(groupDao.get(member.getGroupId()));
			}

			// add all the public groups
			set.addAll(groupDao.getPublic());

			return new ArrayList<Group>(set);
		} else {
			throw new UnsupportedOperationException("Can only request own groups");
		}
	}

	@POST
	public Group create(@Valid Group g) {
		g.setCreatedBy(securityService.getUserId());
		g.setCreatedTs(Calendar.getInstance().getTime());
		return groupDao.create(g);
	}

	@Path("/{groupId}")
	public GroupInstanceResource getGroupInstanceResource() {
		return context.getResource(GroupInstanceResource.class);
	}
}
