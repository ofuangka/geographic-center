package ofuangka.geographiccenter.api.domain;

import javax.xml.bind.annotation.XmlRootElement;

import ofuangka.geographiccenter.api.support.HasId;

@XmlRootElement
public class User extends HasId {

	private String username;
	private String logoutUrl;

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setLogoutUrl(String logoutUrl) {
		this.logoutUrl = logoutUrl;
	}

	public String getLogoutUrl() {
		return logoutUrl;
	}
}
