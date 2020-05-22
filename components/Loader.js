/* @flow */
/* eslint react/jsx-filename-extension: 0 */

import * as React from 'react';

/** Images */
// import LoaderImg from 'assets/images/loader.gif';
// import LoaderImgText from 'assets/images/loading_text.gif';
// import SaveImgText from 'assets/images/saving_text.gif';

/** Semantic Component */
import { Dimmer, Image, Header, Placeholder } from 'semantic-ui-react';


const Loader = ({ transparent = false }) => {
    return (
        <React.Fragment>
            <Dimmer active inverted>
                <Image src="/images/loader.gif" />
                {/* {
                            post ?
                            <Image src={SaveImgText} style={{ width: 80 }}/> :
                            <Image src={LoaderImgText} style={{ width: 140 }}/>
                        } */}
            </Dimmer>
            {
                !transparent &&
                <Placeholder fluid style={{ height: '100%' }}>
                    <Placeholder.Image rectangular />
                </Placeholder>
            }
        </React.Fragment>
    );
}

export default Loader;

