export const config = {
    'username': process.env.POSTGRES_USERNAME ? process.env.POSTGRES_USERNAME : 'shine102',
    'password': process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'shine102',
    'database': process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'shine102',
    'host': process.env.POSTGRES_HOST,
    'dialect': 'postgres',
    'aws_region': process.env.AWS_REGION ? process.env.AWS_REGION : 'ap-southeast-1',
    // 'aws_profile': 'serverless',
    'aws_profile': process.env.AWS_PROFILE ? process.env.AWS_PROFILE : 'serverless',
    'aws_media_bucket': process.env.AWS_BUCKET ? process.env.AWS_BUCKET : 'shinephoto',
    'url': process.env.URL ? process.env.URL : 'localhost:8100',
    'jwt': {
      'secret': process.env.JWT_SECRET,
    },
  };
  