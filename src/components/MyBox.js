import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { collection, query, getDocs, doc, increment, updateDoc} from "firebase/firestore";
import Button from '@mui/material/Button';


export default function MyBox(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCount()
  })
  
  async function getCount() {
    const q = query(collection(props.db, "count"));
    
    const querySnapshot = await getDocs(q);
    let info = []
    querySnapshot.forEach((doc) => {
        info.push(doc.data())
    });
    setCount(info[0].count)
  }

  async function increaseCount() {
    try {
        const docRef = doc(props.db, "count", process.env.REACT_APP_DOCUMENT_ID);
        updateDoc(docRef, {count: increment(1)})
        .then(docRef => {
            console.log(`Count is updated`);
            setCount(count + 1)
        })
        .catch(error => {
            console.log(error);
        })

    }
    catch(err) {
        console.error("Failed to update count", err)
    }
  }

  return (
    <>
      <div style={{padding: '3em', display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}>
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 300,
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
          <Typography variant="h2" gutterBottom>
            {count}
          </Typography>
        </Box>
      </div>
      <div style={{display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}>
        <Button
          variant="contained" onClick={increaseCount}>
            Click Me
        </Button>
      </div>
    </>
  );
}