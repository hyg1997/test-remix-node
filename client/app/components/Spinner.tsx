import { SearchCircleIcon } from "@heroicons/react/outline";
import { Icon } from "@tremor/react";

export default function Spinner() {
  return <Icon size="xl" icon={SearchCircleIcon} className="animate-spin max-h-4" />;
}
