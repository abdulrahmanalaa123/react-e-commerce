export function manageCors(req: Request) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", req.headers.get("origin")!);
  headers.set(
    "Access-Control-Allow-Headers",
    req.headers.get("access-control-request-headers")!
  );
  headers.set(
    "Access-Control-Allow-Methods",
    req.headers.get("access-control-request-method")!
  );
  return new Response("ok", {
    status: 200,
    headers: headers,
  });
}
