import { LocationStatus, Status } from "@prisma/client";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";

export const getLocationStatus = (longitude: number, latitude: number):LocationStatus => {
    const pt = point([longitude, latitude]);
    const poly = polygon([[
        [29.214395499933566, 78.97429035335622],
        [29.213956534041934, 78.97509010889893],
        [29.213589528328384, 78.97471084338382],
        [29.21384859132146, 78.97409659814741],
        [29.214395499933566, 78.97429035335622] // repeat first to close the loop
    ]]);
    const result=booleanPointInPolygon(pt,poly)
    
    if(result) return LocationStatus.INSIDE_OFFICE
    else return LocationStatus.OUTSIDE_OFFICE
    
}