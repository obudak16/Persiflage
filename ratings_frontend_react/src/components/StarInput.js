import React from 'react'
import '../starInput.css'

export default function StarInput({handleRate}) {

    return (
        <fieldset className="rate">
            <input onChange={handleRate}  type="radio" id="rating10" name="rating" value="5" /><label for="rating10" title="5 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating9" name="rating" value="4.5" /><label className="half" for="rating9" title="4 1/2 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating8" name="rating" value="4" /><label for="rating8" title="4 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating7" name="rating" value="3.5" /><label className="half" for="rating7" title="3 1/2 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating6" name="rating" value="3" /><label for="rating6" title="3 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating5" name="rating" value="2.5" /><label className="half" for="rating5" title="2 1/2 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating4" name="rating" value="2" /><label for="rating4" title="2 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating3" name="rating" value="1.5" /><label className="half" for="rating3" title="1 1/2 stars"></label>
            <input onChange={handleRate}  type="radio" id="rating2" name="rating" value="1" /><label for="rating2" title="1 star"></label>
            <input onChange={handleRate}  type="radio" id="rating1" name="rating" value="0.5" /><label className="half" for="rating1" title="1/2 star"></label>
        </fieldset>
    )
}
