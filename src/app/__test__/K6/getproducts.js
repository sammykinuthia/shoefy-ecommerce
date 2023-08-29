import { check } from 'k6';
import http from 'k6/http';

export default function () {
    const url = 'http://localhost:3030/projects';
    const payload = JSON.stringify({
        email: 'samuelmwaniki17@gmail.com',
        password: 'samm',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbW15IiwiZW1haWwiOiJzYW11ZWxtd2FuaWtpMTdAZ21haWwuY29tIiwiaWQiOiJmYzdlMTIxNy00Y2Y5LTRlMGEtYmY1OS01YTM5NDEwMWRlNzYiLCJpYXQiOjE2OTMyOTQ3MTksImV4cCI6MTY5MzMwOTExOX0.t16nrSMVNh8VB0SbO7d0mO_Ob5f7dCQQfjaPIxmUBN4",
        },
    };


    const res = http.get(url, params);

}


export const options = {
    scenarios: {
      example_scenario: {
        // name of the executor to use
        executor: 'shared-iterations',
  
        // common scenario configuration
        startTime: '10s',
        gracefulStop: '5s',
        env: { EXAMPLEVAR: 'testing' },
        tags: { example_tag: 'testing' },
  
        // executor-specific configuration
        vus: 10,
        iterations: 200,
        maxDuration: '10s',
      },

    },
  };