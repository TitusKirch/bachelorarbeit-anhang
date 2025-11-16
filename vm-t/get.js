import { check } from "k6";
import http from "k6/http";

export let options = {
  vus: 10,
  duration: "30s",
  tags: { node: `${__ENV.NODE_NAME}` },
};

function getDeterministicId(vu, iteration) {
  const base = vu * 10000;
  const offset = iteration % 2000;
  return base + offset;
}

export default function () {
  const id = getDeterministicId(__VU, __ITER);
  let res = http.get(`http://${__ENV.NODE_IP}/api/posts/${id}`);
  check(res, { "GET Status is 200": (r) => r.status === 200 });

  console.log(`GET Response time: ${res.timings.duration}ms`);
}