/*'use client'
import { useReducer } from "react"
import ProductCard from "./Card"

export default function CardPanel() {

    return(
        <div>
            <div style={{margin: "20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                <ProductCard venueName="The Bloom Pavilion" imgSrc='/img/bloom.jpg'/>
                <ProductCard venueName="Spark Space" imgSrc='/img/sparkspace.jpg'/>
                <ProductCard venueName="The Grand Table" imgSrc='/img/grandtable.jpg'/>
            </div>
        </div>
    )
}*/

'use client';
import { useReducer } from 'react';
import ProductCard from './Card';

export default function CardPanel() {
    // กำหนดค่าเริ่มต้นของสถานที่ทั้ง 3 แห่ง
    const initialState: Map<string, number> = new Map([
        ['The Bloom Pavilion', 0],
        ['Spark Space', 0],
        ['The Grand Table', 0]
    ]);

    // Reducer function
    function reducer(state: Map<string, number>, action: { type: string; venue: string; rating?: number }): Map<string, number> {
        switch (action.type) {
            case 'UPDATE_RATING':
                if (action.rating !== undefined) {
                    return new Map(state).set(action.venue, action.rating);
                }
                return state;
            case 'REMOVE_VENUE': {
                const newState = new Map(state);
                newState.delete(action.venue);
                return newState;
            }
            default:
                return state;
        }
    }

    // ใช้ useReducer
    const [venueRatings, dispatch] = useReducer(reducer, initialState);

    // ฟังก์ชันอัปเดตค่า Rating
    function updateRating(venue: string, rating: number) {
        dispatch({ type: 'UPDATE_RATING', venue, rating });
    }

    // ฟังก์ชันลบสถานที่ออกจากรายการ
    function removeVenue(venue: string) {
        dispatch({ type: 'REMOVE_VENUE', venue });
    }

    return (
        <div className="p-4">
            {/* Card Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from(venueRatings.keys()).map((venue) => (
                    <ProductCard key={venue} venueName={venue} imgSrc={`/img/${venue.toLowerCase().replace(/\s+/g, '')}.jpg`} />
                ))}
            </div>

            {/* Venue Rating List */}
            <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Venue Ratings</h3>
                <ul className="mt-2 space-y-2">
                    {Array.from(venueRatings.entries()).map(([venue, rating]) => (
                        <li
                            key={venue}
                            data-testid="ชอสถานทจดงาน"
                            className="cursor-pointer p-2 border-b hover:bg-gray-100 transition"
                            onClick={() => removeVenue(venue)}
                        >
                            {venue} Rating: {rating}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
