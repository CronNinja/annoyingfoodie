const CreateReview = ({formState, setFormState }) => {
    function setInput(key, value) {
        if(key === 'rating'){
            let v = Number(value);
            setFormState({ ...formState, [key]: v });
        } else {
            setFormState({ ...formState, [key]: value });
        }
    }
    return (
        <div>
        <label>Title</label>
        <input
            type='text'
            onChange={event => setInput('title', event.target.value)}
            value={formState.title}
        />
         <label>Rating</label>
        <input
            type='number'
            step='.25'
            onChange={event => setInput('rating', event.target.value)}
            value={formState.rating}
            min="0"
            max="10"
        />
        <label>Body</label>
        <textarea
            onChange={event => setInput('body', event.target.value)}
            value={formState.body}
            rows="10"
        />
        </div>
    );
}
 
export default CreateReview;