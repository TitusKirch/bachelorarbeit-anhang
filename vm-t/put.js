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

  let res = http.put(`http://${__ENV.NODE_IP}/api/posts/${id}`, {
    'title': 'Nihil et aliquam aliquid doloremque.',
    'content': 'Officia et itaque harum soluta repellat. Suscipit adipisci nostrum culpa sunt ut. Amet dolorum nulla voluptatum rerum aspernatur. Sed quis porro qui quae accusamus autem omnis. Nulla molestias maiores quia distinctio. Sit voluptatem cumque facilis vero nihil sit fuga. Eos molestiae occaecati eligendi ab debitis qui quis quo. A inventore nemo impedit consequuntur inventore blanditiis. Ut eos iure consequatur aliquid.',
    'user_id': 1,
    'meta': {
        'keywords': ['iure', 'id', 'perferendis', 'aut', 'necessitatibus'],
    },
  });
  check(res, { "GET Status is 200": (r) => r.status === 200 });

  console.log(`GET Response time: ${res.timings.duration}ms`);
}