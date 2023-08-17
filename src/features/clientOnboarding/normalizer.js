import {get} from 'lodash';

export const normalizeCreateClientData = (data) => {
    return {
        'description': get(data, 'description', ''),
        'email': get(data, 'email', ''),
        'logo': get(data, 'logo', ''),
        'organization_name': get(data, 'organizationName', ''),
        'password': get(data, 'password', ''),
        'subdomain': get(data, 'subdomain', ''),
        'user_name': get(data, 'userName', ''),
        'website': get(data, 'website', ''),
    }
}