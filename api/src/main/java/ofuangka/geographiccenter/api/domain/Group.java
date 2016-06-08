package ofuangka.geographiccenter.api.domain;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import ofuangka.geographiccenter.api.support.HasId;

@XmlRootElement
public class Group extends HasId {

	@NotNull
	@NotBlank
	@Length(min = 1, max = 100)
	private String name;

	@Null
	private String createdBy;

	@Null
	private Date createdTs;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedTs(Date createdTs) {
		this.createdTs = createdTs;
	}

	public Date getCreatedTs() {
		return createdTs;
	}

	@Override
	public boolean equals(Object obj) {
		// 2 groups are the same if they have the same ID
		return obj instanceof Group && obj != null && StringUtils.equals(((Group) obj).id, id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}
}
