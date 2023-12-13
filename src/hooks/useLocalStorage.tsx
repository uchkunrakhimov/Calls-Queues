export const storedCanManage: any = localStorage.getItem("canManage");
export const storedAvailableMembers: any = JSON.parse(
  localStorage.getItem("availableMembers") || "{}"
);
export const storedActiveNumbers: any = JSON.parse(
  localStorage.getItem("activeNumbers") || "[]"
);
export const storedTargetItem: any = localStorage.getItem("targetItem");
export const storedDynamicMembers = localStorage.getItem("dynamicMembers");
export const storedActiveTabKey = localStorage.getItem("activeTabKey");
export const storedUserData: string | null = localStorage.getItem("userData");
