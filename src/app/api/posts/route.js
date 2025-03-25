import { NextResponse } from "next/server";

// 貼文數據
const allPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg",
    caption: "Loving the neon vibes in Tokyo! 🌃 #JapanAdventures",
    timestamp: "2025-03-24T10:30:00Z",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/31258526/pexels-photo-31258526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Big Ben says hello! Enjoying a rainy day in London. ☔ #UKTravel",
    timestamp: "2025-03-23T15:45:00Z",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Sunset vibes in Lisbon are unreal. Loving this city! 🌅 #Portugal",
    timestamp: "2025-03-22T19:15:00Z",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/13256466/pexels-photo-13256466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Paradise found in Palawan! Beach life is the best. 🏝️ #Philippines",
    timestamp: "2025-03-21T09:00:00Z",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/981682/pexels-photo-981682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Pizza, pasta, and history in Italy. Can’t get enough! 🍝 #Italia",
    timestamp: "2025-03-20T12:20:00Z",
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/10006127/pexels-photo-10006127.jpeg?auto=compress&cs=tinysrgb&w=1200",
    caption: "Chasing waterfalls in New Zealand. Nature at its finest! 🌿 #NZMustDo",
    timestamp: "2025-03-19T08:10:00Z",
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Dancing through the Amazon in Brazil! Jungle vibes. 🌴 #BrazilTravel",
    timestamp: "2025-03-18T14:00:00Z",
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/90597/pexels-photo-90597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "High in the Andes! Peru’s magic is unreal. ⛰️ #PeruAdventures",
    timestamp: "2025-03-17T09:30:00Z",
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/1631661/pexels-photo-1631661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    caption: "Desert nights in Jordan! Petra under the stars. 🌠 #JordanJourney",
    timestamp: "2025-03-16T22:45:00Z",
  },
];

// 處理 GET 請求
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "2", 10);

  // 計算分頁的起始和結束索引
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // 模擬分頁數據
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  // 模擬 API 延遲（可選）
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    posts: paginatedPosts,
    total: allPosts.length, // 總貼文數
  });
}