package ofuangka.geographiccenter.api.dao;

import java.util.List;

import ofuangka.geographiccenter.api.domain.Group;

public interface GroupDao {

	List<Group> getCreatedByUserId(String userId);

	Group get(String id);

	Group create(Group g);
	
	List<Group> all();
	
	List<Group> getPublic();
}
