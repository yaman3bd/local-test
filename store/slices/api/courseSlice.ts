import { apiSlice } from "@/store/slices/api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchCourses: builder.query<any, void>({
      query: () => ({
        url: "/courses",
        method: "GET"
      })
    }),
    fetchCourse: builder.query<any, { slug: number | string }>({
      query: ({ slug }) => ({
        url: `/courses/${slug}`,
        method: "GET"
      })
    })
  })
});
// Export hooks for usage in functional components
export const {
  useFetchCoursesQuery,
  useFetchCourseQuery,
  util: { getRunningQueriesThunk: getRunningCoursesQueries }
} = extendedApiSlice;

// export endpoints for use in SSR
export const { fetchCourses, fetchCourse } = extendedApiSlice.endpoints;
