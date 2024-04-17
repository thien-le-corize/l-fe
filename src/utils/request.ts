type Payload = {
  url: string;
  query: Record<string, string>;
  target?: "_blank" | "_self";
};

/**
 * Transit page with POST
 */
export const post = ({ url, query, target }: Payload) => {
  const form = document.createElement("form");
  form.action = url;
  form.acceptCharset = "shift-jis";
  form.method = "post";
  if (target) {
    form.target = target;
  }

  Object.entries(query).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.name = key;
    input.value = value;
    input.type = "hidden";
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  if (target === "_blank") {
    form.remove();
  }
};
