/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_API=process.env.BASE_API_URL;
console.log({BASE_API})
// export const api = axios.create({
  // baseURL:BASE_API+"/api",
// });

export const buildQueryString = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

export const fetchPublicData = async (
  section: "shop" | "hero" | "featured" | "category-types",
  queryParams: Record<string, any> = {}
) => {
  try {
    const queryString = buildQueryString(queryParams);

    const url =BASE_API+`/api/public/sections/${section}${queryString ? `?${queryString}` : ""
      }`;
        console.log({url})
    const { data } = await axios.get(url);

    return data?.data || [];
  } catch (error) {
    console.error("fetchPublicData error:", error);
    return [];
  }
};