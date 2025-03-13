'use client'
import { useReducer } from "react"
import ProductCard from "./Card"

export default function CardPanel() {

    const defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const cardReducer = (venueList: Map<string, number>, action: { type: string; venueName: string; rating?: number }) => {
        const newVenueList = new Map(venueList);
        switch (action.type) {
            case 'increase key-value': {
                newVenueList.set(action.venueName, action.rating ?? 0);
                return newVenueList;
            }
            case 'decrease key-value': {
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default:
                return venueList;
        }
    };    

    const [venueList, dispatchRating] = useReducer(cardReducer, defaultVenue);

    const handleRatingChange = (venueName: string, rating: number) => {
        dispatchRating({ type: 'increase key-value', venueName, rating });
    };

    return(
        <div>
            <div style={{margin: "20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            <ProductCard 
                venueName="The Bloom Pavilion" 
                imgSrc='/img/bloom.jpg'
                onRating={handleRatingChange}
            />
            <ProductCard 
                venueName="Spark Space" 
                imgSrc='/img/sparkspace.jpg'
                onRating={handleRatingChange}
            />
            <ProductCard 
                venueName="The Grand Table" 
                imgSrc='/img/grandtable.jpg'
                onRating={handleRatingChange}
            />

            </div>
            <div className="w-full text-xl font-medium">Compare List: { venueList.size }</div>
            {Array.from(venueList).map(([venueName, rating]) => (
                    <div data-testid={venueName} key={venueName} className="text-xl"
                    onClick={()=>dispatchRating({type:'decrease key-value', venueName, rating:0})}>
                        {venueName} : {rating}
                    </div>
            ))}

        </div>
        
    )
}
