export function getGoogleColor(colorId?: string) {
  switch (colorId) {
    case "1": return "bg-indigo-500/30 text-indigo-100 border-indigo-500/50"; // Lavender
    case "2": return "bg-emerald-500/30 text-emerald-100 border-emerald-500/50"; // Sage
    case "3": return "bg-purple-500/30 text-purple-100 border-purple-500/50"; // Grape
    case "4": return "bg-rose-500/30 text-rose-100 border-rose-500/50"; // Flamingo
    case "5": return "bg-amber-500/30 text-amber-100 border-amber-500/50"; // Banana
    case "6": return "bg-orange-500/30 text-orange-100 border-orange-500/50"; // Tangerine
    case "7": return "bg-sky-500/30 text-sky-100 border-sky-500/50"; // Peacock
    case "8": return "bg-gray-500/30 text-gray-100 border-gray-500/50"; // Graphite
    case "9": return "bg-blue-500/30 text-blue-100 border-blue-500/50"; // Blueberry
    case "10": return "bg-green-500/30 text-green-100 border-green-500/50"; // Basil
    case "11": return "bg-red-500/30 text-red-100 border-red-500/50"; // Tomato
    default: return "bg-workspace-accent/30 text-white border-workspace-accent/50"; // Default
  }
}
