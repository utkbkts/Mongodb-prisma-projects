"use server"
import prisma from "@/libs/db/prismadb";

export default async function getallUsers() {
  try {
    const courses = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeCourse = courses.map((course) => ({
      ...course,
      createdAt: course.createdAt.toISOString(),
    }));

    return safeCourse;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
