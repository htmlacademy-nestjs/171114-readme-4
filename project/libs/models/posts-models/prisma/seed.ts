import { PrismaClient, Prisma } from '../../../../../node_modules/.prisma/client'

const prisma = new PrismaClient();

const post1: Prisma.PostCreateInput = {
  userId:'1',
  type: 'text',
  title: 'Title test',
  announcement: 'test test',
  text: 'Long text',
  status: 'published',
  likesCount:1,
  commentsCount:0,
  likes: {
    create: [
      {
        likedByUsersIds: ['2']
      }
    ]
  }
}
const post2: Prisma.PostCreateInput = {
  userId:'2',
  type: 'text',
  title: 'Title new test',
  announcement: 'new test test',
  text: 'Very long text',
  status: 'published',
  likesCount:1,
  commentsCount:0,
  likes: {
    create: [
      {
        likedByUsersIds: ['2']
      }
    ]
  }
}

async function fillDb() {
  await prisma.post.createMany({
    data:[
      post1,
      post2
    ]
  });
  console.info('Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
