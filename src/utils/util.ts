// assigning the object to the map with the name as a key
export function processObjectToMapByName(items: any, itemMap: Map<any, any>, itemType: string) 
{
  items.forEach((item: any) => {
    if (item.name !== "") {
      itemMap.set(item.name, item);
      itemMap.get(item.name)["type"] = itemType;
    }
  });
}

// assigning the object to the map with the id as a key
export function processObjectToMapById(items: any, itemMap: Map<any, any>, itemType: string) 
{
  items.forEach((item: any) => {
    if (item.name !== "") {
      const id = grabId(item.url);
      itemMap.set(id, item);
      itemMap.get(id)["type"] = itemType;
    }
  });
}

// extracting the id from the URL
export function grabId(url: string) 
{
  return url.split("/api/")[1];
}
