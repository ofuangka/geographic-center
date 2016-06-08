package ofuangka.geographiccenter.api.dao;

import java.util.List;

import ofuangka.geographiccenter.api.domain.Member;

public interface MemberDao {

	Member get(String memberId);

	Member update(Member newValue);

	Member create(Member member);

	Member delete(String memberId);

	List<Member> getByGroupId(String groupId);

	List<Member> getByUserId(String userId);
}
