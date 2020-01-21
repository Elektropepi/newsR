export function subscribeGroup(group: string) {
  const subscribedGroups = getSubscribedGroups();

  if (!!subscribedGroups.find(g => g === group))
    return;

  localStorage.setItem("subscribedGroups", JSON.stringify(subscribedGroups.concat(group)))
}

export function unsubscribeGroup(group: string) {
  const subscribedGroups = getSubscribedGroups();

  if (!subscribedGroups.find(g => g === group))
    return;

  localStorage.setItem("subscribedGroups", JSON.stringify(subscribedGroups.filter(g => g !== group)))
}

export function getSubscribedGroups(): string[] {
  const subscribedGroups = localStorage.getItem("subscribedGroups");

  if (!subscribedGroups)
    return [];

  return JSON.parse(subscribedGroups);
}

export function addReadArticle(group: string, article: string) {
  const readArticles = getReadArticles(group);

  if (!!readArticles.find(a => a === group))
    return;

  localStorage.setItem(group, JSON.stringify(readArticles.concat(article)))
}

export function getReadArticles(group: string): string[] {
  const readArticles = localStorage.getItem(group);

  if (!readArticles)
    return [];

  return JSON.parse(readArticles);
}
