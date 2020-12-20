export const initialValuesMap = {
    spacing: '0 0 0 0',
    sizing: '0px',
    direction: 'row',
    align: 'stretch',
    justify: 'space-between',
    grow: '1'
};

function isTextCmp(cmpRole) {
    switch (cmpRole) {
        case 'text':
            return true
        case 'button':
            return true
        case 'title':
            return true
        default:
            return false
    }
}

function isMediaCmp(cmpRole) {
    switch (cmpRole) {
        case 'img':
            return true;
        case 'video':
            return true;
        case 'map':
            return true;
        case 'media':
            return true;
        default:
            return false;
    }
}

function isSectionCmp(cmpRole) {
    switch (cmpRole) {
        case 'form':
            return true;
        case 'section':
            return true;
        case 'card':
            return true;
        case 'nav':
            return true;
        case '_root':
            return false;
        default:
            return false;
    }
}

function getSectionTitle(role) {
    if (isMediaCmp(role)) return 'Source';
    switch (role) {
        case 'text':
            return 'Text';
        case 'map':
            return 'Location';
        case 'button':
        case 'input':
            return 'Inner Text Edit';
        case '_root':
            return 'Website Settings';
        default:
            return 'Inner Content Alignment';
    }
}

function isDisabled(sizeProperty, cmp, parentFlexDir) {
    const cmpFlexGrow = cmp.prefs.style.flexGrow || initialValuesMap.grow;
    let isDisable = false;

    if (cmpFlexGrow === '1') {
        if ((sizeProperty === 'maxWidth' && parentFlexDir === 'row') ||
            (sizeProperty === 'minHeight' && parentFlexDir === 'column'))
            isDisable = true;
    }

    return isDisable;
}

function isAlignmentActive(alignment, cmp) {
    let isActive;
    const { flexDirection, alignItems, justifyContent } = cmp.prefs.style,
        direction = flexDirection ? flexDirection : 'row';

    const dirRow = direction === 'row',
        dirCol = direction === 'column',
        alignStretch = !alignItems || alignItems === 'stretch',
        alignStart = alignItems === 'flex-start',
        alignCenter = alignItems === 'center',
        alignEnd = alignItems === 'flex-end',
        justifyBetween = !justifyContent || justifyContent === 'space-between',
        justifyStart = justifyContent === 'flex-start',
        justifyCenter = justifyContent === 'center',
        justifyEnd = justifyContent === 'flex-end';

    switch (alignment) {
        case 'space-between':
            isActive = justifyBetween;
            break;
        case 'stretch':
            isActive = alignStretch;
            break;
        case 'top':
            isActive = (dirRow && alignStart) || (dirCol && justifyStart);
            break;
        case 'middle':
            isActive = (dirRow && alignCenter) || (dirCol && justifyCenter);
            break;
        case 'bottom':
            isActive = (dirRow && alignEnd) || (dirCol && justifyEnd);
            break;
        case 'left':
            isActive = (dirCol && alignStart) || (dirRow && justifyStart);
            break;
        case 'center':
            isActive = (dirCol && alignCenter) || (dirRow && justifyCenter);
            break;
        case 'right':
            isActive = (dirCol && alignEnd) || (dirRow && justifyEnd);
            break;
        default:
            isActive = false;
    }
    return isActive ? 'active' : '';
}

function removeRedundantStyles(style) {
    if (style.width) delete style.width;
    if (style.height) delete style.height;
    if (style.minHeight === 'initial') delete style.minHeight;
    if (style.maxWidth === '100%' || style.maxWidth === 'initial') delete style.maxWidth;
    if (style.justifyContent === 'space-between') delete style.justifyContent;
    if (style.alignItems === 'stretch') delete style.alignItems;
    if (style.padding === '0' || style.padding === '0px' || style.padding === '0px 0px 0px 0px') delete style.padding;
    if (style.margin === '0' || style.margin === '0px' || style.margin === '0px 0px 0px 0px') delete style.margin;
    if (style.borderRadius === '0' || style.borderRadius === '0px' || style.borderRadius === '0px 0px 0px 0px') delete style.borderRadius;
    if (style.fontSize === '16') delete style.fontSize;
    if (style.backgroundColor && style.backgroundColor.match(/rgba\(\d+,\d+,\d+,0\)/)) delete style.backgroundColor
    if (style.fontWeight === 'normal') delete style.fontWeight;
    return style;
}

export default {
    isMediaCmp,
    isTextCmp,
    isSectionCmp,
    getSectionTitle,
    initialValuesMap,
    isAlignmentActive,
    isDisabled,
    removeRedundantStyles
}