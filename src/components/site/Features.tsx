// import { CheckCircle, Shield, Clock, Users } from "lucide-react";

// export function Features() {
//   const features = [
//     {
//       icon: CheckCircle,
//       title: "Free Quotes",
//       description: "Get comprehensive, no-obligation quotes tailored to your specific project needs"
//     },
//     {
//       icon: Shield,
//       title: "Fully Insured",
//       description: "Complete peace of mind with full insurance coverage for all our services"
//     },
//     {
//       icon: Clock,
//       title: "Fast Response",
//       description: "Quick turnaround times and efficient service to keep your project on schedule"
//     },
//     {
//       icon: Users,
//       title: "Experienced Team",
//       description: "Skilled professionals with years of industry expertise and proven track record"
//     }
//   ];

//   return (
//     <section className="relative bg-[#F8F6F3] py-20 lg:py-24">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <div
//                 key={feature.title}
//                 className="relative group"
//               >
//                 {/* Vertical Divider */}
//                 {index > 0 && index < features.length && (
//                   <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D8C2A0]/30 to-transparent" />
//                 )}
                
//                 <div className="px-6 lg:px-8 py-8 lg:py-12 text-center group-hover:bg-[#D8C2A0]/5 transition-all duration-300">
//                   {/* Icon Container */}
//                   <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D8C2A0]/10 flex items-center justify-center group-hover:bg-[#D8C2A0]/20 transition-all duration-300 group-hover:scale-110">
//                     <Icon className="w-8 h-8 text-[#D8C2A0]" />
//                   </div>
                  
//                   {/* Title */}
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D8C2A0] transition-colors duration-300">
//                     {feature.title}
//                   </h3>
                  
//                   {/* Description */}
//                   <p className="text-gray-600 leading-relaxed text-sm">
//                     {feature.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
