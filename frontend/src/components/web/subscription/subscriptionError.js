import React, { useRef, useEffect, useState } from "react";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';


export default function SubscriptionSuccess(props) {

    return (
        <div style={{marginTop:'5%'}}>
            <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        Something went wrong... :(
      </Alert>
        </div>
      );
    }