# Capstone project for cloud deveplover

## Project: microservices 

### Project description
1. Base code is from capstone project in monolith to microservices at scale course.
2. Add unit test for each api (feed api, user api)
3. Add blue/green deployment for api feed (view udagram-api-feed-deployment-v2.yaml)
4. Add cloudformation file for create s3 and rds database (view cloudformation.json)
5. Add github action file for auto build docker image and push to docker hub (view .github/workflows/manual.yml)

### How to run
1. Run `npm install` to install all dependencies
2. Go to each folder and run `npm run dev` to start the server
3. For testing, run `npm run test` to run unit test
4. Deploy step same as monolith to microservices at scale course
5. For blue/green deployment, run `kubectl apply -f udagram-api-feed-deployment-v2.yaml` to deploy new version of feed api. we will have 2 version of this api running at the same time 