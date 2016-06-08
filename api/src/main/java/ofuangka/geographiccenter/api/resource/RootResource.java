package ofuangka.geographiccenter.api.resource;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import ofuangka.geographiccenter.api.domain.User;
import ofuangka.geographiccenter.api.security.SecurityService;

@Path("/")
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class RootResource {

	private static final String BASE_URL = System.getProperty("geographic-center.logout-url");

	@Inject
	private SecurityService securityService;

	@Context
	private ResourceContext context;

	@Path("/groups")
	public GroupCollectionResource getGroupCollectionResource() {
		return context.getResource(GroupCollectionResource.class);
	}

	@Path("/members")
	public MemberCollectionResource getMemberCollectionResource() {
		return context.getResource(MemberCollectionResource.class);
	}

	@GET
	@Path("/users/self")
	public User self() {
		User ret = new User();
		ret.setId(securityService.getUserId());
		ret.setUsername(securityService.getUsername());
		ret.setLogoutUrl(securityService.getLogoutUrl(BASE_URL));
		return ret;
	}
}
