export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  disabled?: boolean,
  subtitle?: string,
  badge?: boolean,
  badgeType?: string,
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  disabled?: boolean,
  subtitle?: string,
  badgeType?: string,
  badge?: boolean,
}


import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "Home",
    children: [
      {
        name: "Dashboard",
        icon: 'tabler:aperture',
        id: uniqueId(),
        url: "/",
      },
      {
        name: "Students",
        icon: 'tabler:users',
        id: uniqueId(),
        url: "/students",
      },
      {
        id: uniqueId(),
        name: "Falkutas",
        icon: 'tabler:layout-grid', // Assuming IconLayoutGrid maps to a string icon
        url: "/falkutas",
      },
      {
        id: uniqueId(),
        name: "Jurusan",
        icon: 'tabler:list', // Assuming IconList maps to a string icon
        url: "/jurusan",
      },
    ],
  },
];

export default SidebarContent;
