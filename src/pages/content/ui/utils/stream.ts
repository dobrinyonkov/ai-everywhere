type Metadata = {
  [key: string]: string | number | boolean;
};

export async function stream(
  message: string,
  history: string,
  metadata: Metadata,
  onMessage: (message: string) => void,
) {
  const response = await fetch('http://localhost:3030/api/ask', {
    method: 'POST',
    headers: {
      'Transfer-Encoding': 'chunked',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  const reader = response.body.getReader();

  let { done, value } = await reader.read();

  while (!done) {
    if (done) {
      break;
    }

    const data = new TextDecoder().decode(value);
    onMessage(data);

    ({ done, value } = await reader.read());
  }
}
