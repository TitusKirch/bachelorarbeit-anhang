import { check } from "k6";
import http from "k6/http";

export let options = {
  vus: 10,
  duration: "30s",
  tags: { node: `${__ENV.NODE_NAME}` },
};

export default function () {
  let res = http.get(`http://${__ENV.NODE_IP}/api/posts?per_page=100`);
  check(res, { "GET Status is 200": (r) => r.status === 200 });

  console.log(`GET Response time: ${res.timings.duration}ms`);
}
