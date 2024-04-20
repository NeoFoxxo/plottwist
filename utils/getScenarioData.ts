import { story } from "@/components/DashboardMobile";
import getCommentCount from "./actions/database/getCommentCount";
import getStoryBookmarkCount from "./actions/database/getStoryBookmarkCount";
import getUserInfo from "./actions/database/getUserinfo";

export async function getScenarioData(
  mostPopular: story[],
  recentStories: story[]
) {
  const getScenarioData = async (singleScenario: story) => {
    const userInfo = await getUserInfo(singleScenario?.user_id);
    const bookmarkCount = await getStoryBookmarkCount(singleScenario.id!!);
    const commentCount = await getCommentCount(singleScenario.id!!);

    return { userInfo, bookmarkCount, commentCount };
  };

  const mostPopularData = await Promise.all(mostPopular.map(getScenarioData));
  const recentStoriesData = await Promise.all(
    recentStories.map(getScenarioData)
  );
  return { mostPopularData, recentStoriesData };
}
