package ofuangka.geographiccenter.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.commons.io.IOUtils;

/**
 * Workaround because Google App Engine doesn't let you handle 404s, and Angular
 * 2 uses HTML5 paths for routing
 * 
 * @author ofuangka
 *
 */
public class NotFoundFilter implements Filter {

	private class NotFoundResponseWrapper extends HttpServletResponseWrapper {
		private static final String PAGE = "/ui/index.html";

		private HttpServletRequest request;

		public NotFoundResponseWrapper(HttpServletRequest request, HttpServletResponse response) {
			super(response);
			this.request = request;
		}

		@Override
		public void sendError(int sc) throws IOException {
			if (isNotFound(sc)) {
				sendFallback();
			} else {
				super.sendError(sc);
			}
		}

		private boolean isNotFound(int sc) {
			return sc == HttpServletResponse.SC_NOT_FOUND;
		}

		private void sendFallback() throws IOException {
			IOUtils.copy(this.request.getSession().getServletContext().getResourceAsStream(PAGE), getOutputStream());
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		chain.doFilter(request,
				new NotFoundResponseWrapper((HttpServletRequest) request, (HttpServletResponse) response));
	}

	@Override
	public void destroy() {

	}

}
