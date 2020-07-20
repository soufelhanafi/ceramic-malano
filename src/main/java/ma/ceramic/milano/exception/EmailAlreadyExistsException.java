package ma.ceramic.milano.exception;

public class EmailAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 3743503472907415585L;

	public EmailAlreadyExistsException(String message) {
		super(message);
	}

}
