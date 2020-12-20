import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function WapPreview(props) {
    const classes = useStyles();
    const { thumbnailUrl, name } = props.wap.settings;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia className={classes.media} image={thumbnailUrl || '/images/imagena.png'} title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className="text-center">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="flex space-around">
                <a href={`https://wap-ca.herokuapp.com/${props.wap._id}`} target='mywebsite'>
                    <Button size="small" color="primary">View</Button>
                </a>
                <Button size="small" href={`/editor/${props.wap._id}/wap`} color="primary">Edit</Button>
                <Button onClick={() => props.deleteWap(props.wap._id)} size="small" color="primary">Delete</Button>
            </CardActions>
        </Card >
    )

}
