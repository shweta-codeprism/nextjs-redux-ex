
/** Semantic Imports */
import { Card, Header, Segment, Image, Label, Icon, Grid } from 'semantic-ui-react';

/** CSS Imports*/
import styles from './CategoryDetails.module.scss';

const AddCategory = ({ category }) => {
    return (
        <Segment basic className={styles.details_content}>
            <div>
                <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                <Header as="h5">
                    {` Commission: ${category.commission}${category.commissionMode}`}
                </Header>
                <Label>
                    <Icon name="box" />
                    23 Products
                </Label>
                <Label>
                    <Icon name="user" />
                    23 Vendors
                </Label>
            </div>
            <div className={styles.details_content_2}>
                <Header as="h5">
                    Sub-Categories:
                </Header>
                <Grid columns={3}>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Health & Supplements
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            Sports
                            <Icon name="close" />
                        </Label>
                    </Grid.Column>



                </Grid>

            </div>
        </Segment>
    )

}

export default AddCategory;