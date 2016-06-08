package ofuangka.geographiccenter.api.resource;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import ofuangka.geographiccenter.api.dao.GroupDao;
import ofuangka.geographiccenter.api.domain.Group;

@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public class GroupInstanceResource {

	@Context
	private ResourceContext context;

	@Inject
	private GroupDao groupDao;

	@GET
	public Group read(@PathParam("groupId") String groupId) {
		return groupDao.get(groupId);
	}
}
