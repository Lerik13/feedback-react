import { useContext, useEffect, useState } from "react"
import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"

function FeedbackForm() {
	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')
	
	const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
	
	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false)
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		}
	}, [feedbackEdit]);
	
	const handleTextChange = (e) => {
		const new_text = e.target.value
		if (new_text === '') {
			setBtnDisabled(true)
			setMessage(null)
		} else if(new_text !== '' && new_text.trim().length <= 10) {
			setMessage('Text must be at least 10 characters')
			setBtnDisabled(true)
		} else {
			setMessage(null)
			setBtnDisabled(false)
		}
		
		setText(new_text)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating
			}
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback)
			} else {
				addFeedback(newFeedback)
			}

			setText('')
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className="input-group">
					<input
						value={text}
						onChange={handleTextChange}
						type="text"
						placeholder='Write a review' 
					/>
					<Button type="submit" isDisabled={btnDisabled} id="btn-form-submit">
						Send
					</Button>
				</div>

				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm