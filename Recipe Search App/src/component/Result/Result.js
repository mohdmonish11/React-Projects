import { Box, Button, Modal, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import "./Result.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Result = ({apidata}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="main-box">
      <div className="heading">
        {!isEmpty(apidata) && <p>Menu</p>}
      </div>
      <div className= "box">
        {!isEmpty(apidata) && apidata.map((meal) => {
          const {strMeal,strMealThumb, strIngredient} = meal;
          return(
            <div className="sub-boxes" key={meal.idMeal}>
              {!isEmpty(strMealThumb) && <img src={strMealThumb} height='170' width='170' alt={strMeal}/>}
              {!isEmpty(strMeal) && <h4 className="meal-name">{strMeal}</h4>}
              {!isEmpty (strIngredient) && <div className="ing"> <Button onClick={handleOpen}>Ingredients</Button>
              <Modal
                open={open}
                onClose={handleClose}
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ingredients
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {!isEmpty (strIngredient) && <div>{strIngredient.map(ing =>{
                      return(
                        <h5 key={ing}>{ing}</h5>
                      ) 
                    })}</div>}
                  </Typography>
                </Box>
              </Modal>
              </div>}
              
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default Result;
