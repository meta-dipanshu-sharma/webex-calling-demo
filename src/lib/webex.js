import WebexCore from '@webex/webex-core';
import * as WebexHtmlUtil from '@webex/helper-html';
import * as WebexImageUtil from '@webex/helper-image';


require('@webex/internal-plugin-avatar');
require('@webex/internal-plugin-board');
require('@webex/internal-plugin-calendar');
require('@webex/internal-plugin-conversation');
require('@webex/internal-plugin-encryption');
require('@webex/internal-plugin-feature');
require('@webex/internal-plugin-flag');
require('@webex/internal-plugin-lyra');
require('@webex/internal-plugin-mercury');
require('@webex/internal-plugin-presence');
require('@webex/internal-plugin-search');
require('@webex/internal-plugin-support');
require('@webex/internal-plugin-team');
require('@webex/internal-plugin-user');
require('@webex/internal-plugin-device');
require('@webex/internal-plugin-llm');
require('@webex/internal-plugin-voicea');
require('@webex/internal-plugin-dss');

//require('./MeetingContainers');

require('@webex/plugin-authorization-browser-first-party');
require('@webex/plugin-logger');
require('@webex/plugin-people');

require('@webex/plugin-meetings');
require('@webex/plugin-device-manager');

function generateRedirectUri() {
    let uri = `${window.location.protocol}//${window.location.hostname}`;

    if (window.location.port) {
        uri += `:${window.location.port}`;
    }
    // be specific about adding pathname to redirect uri
    const ciscoDomain = /\.cisco\.com$/;

    if (window.location.host.match(ciscoDomain)) {
        uri += window.location.pathname;
    }

    // When hosting on local files, need to use the fallback redirect_uri
    if (uri.startsWith('file://')) {
        uri = 'urn:ietf:wg:oauth:2.0:oob';
    }

    return uri;
}

let serviceEnv;
const host = window.location.hostname;

if (host.includes('web-int.webex.com')) {
    serviceEnv = 'integration';
} else if (host.includes('web.webex.com')) {
    serviceEnv = 'production';
} else if (host.includes('web-unstable.webex.com')) {
    serviceEnv = 'production';
} else if (host.includes('teams-usgov.webex.com')) {
    serviceEnv = 'fedramp';
} else if (host.includes('web-usgov.webex.com')) {
    serviceEnv = 'fedramp';
} else if (host.includes('web-test.webex.com')) {
    serviceEnv = localStore.get(WEB_TEST_SERVICE_ENV) || 'production';
} else if (host.includes('localhost')) {
    serviceEnv = process.env.SERVICE_ENV || 'production';
} else {
    serviceEnv = process.env.SERVICE_ENV || 'production';
}

const serviceUrls = {
    production: {
        appHub: 'https://apphub.webex.com',
        controlHub: 'https://admin.webex.com',
        controlHubLite: 'https://web.webex.com/admin',
        u2c: 'https://u2c.wbx2.com/u2c/api/v1',
        webAuthentication: 'https://web-authentication-a.wbx2.com',
        changePlanFreetoPaidUrl: 'https://www.webex.com/pricing/index.html',
        deviceUrl: 'https://settings.webex.com/main/devices',
        settingsUrl: 'https://settings.webex.com',
        webexHealthStatusUrl: 'https://status.webex.com',
    },
    integration: {
        appHub: 'https://apphub.webex.com',
        controlHub: 'https://int-admin.webex.com',
        controlHubLite: 'https://web-int.webex.com/admin',
        u2c: 'https://u2c-intb.ciscospark.com/u2c/api/v1/',
        webAuthentication: 'https://web-authentication-intb.ciscospark.com',
        changePlanFreetoPaidUrl: 'https://www-qa3-webex.cisco.com/pricing/index.html',
        deviceUrl: 'https://int-settings.webex.com/main/devices',
        settingsUrl: 'https://int-settings.webex.com',
        webexHealthStatusUrl: 'https://dev-status.webex.com',
    },
    fedramp: {
        controlHub: 'https://admin-usgov.webex.com/',
        u2c: 'https://u2c.gov.ciscospark.com/u2c/api/v1',
    },
};

export const getUrl = (key) => serviceUrls[serviceEnv][key];

const urls = serviceUrls[serviceEnv];

const sdkConfig = {
    credentials: {
        /* clientType: 'confidential',
        client_id: process.env.WEBEX_CLIENT_ID,
        client_secret: process.env.WEBEX_CLIENT_SECRET,
        redirect_uri: generateRedirectUri(),
        scope: 'webexsquare:get_conversation Identity:SCIM spark:kms spark:people_read spark:people_write spark:organizations_read spark:rooms_read spark:rooms_write spark:memberships_read spark:calls_read spark:webrtc_calling spark:calls_write spark:xsi webexsquare:admin meeting:login meeting:preferences_write meeting:preferences_read webex-squared:get_meeting',
        service: 'spark', */
        access_token:"YjEyYzcwY2MtOTM0Ny00Njc5LThiYmEtM2ZlNzkwNDk5ZTM5ZjY4NmIxYTQtNTk4_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f"
    },
    support: {
        appType: 'Web',
        appVersion: '-1',
        languageCode: 'en', // TODO: this will need to be set properly from localStorage at some point
    },
    conversation: {
        allowedOutboundTags: {
            'spark-mention': ['data-object-type', 'data-object-id', 'data-group-type', 'data-object-url'],
            a: ['href'],
            b: [],
            blockquote: ['class'],
            div: [],
            span: ['class'],
            strong: [],
            i: [],
            em: [],
            pre: [],
            code: ['class'],
            br: [],
            hr: [],
            p: [],
            u: [],
            ul: [],
            ol: ['start'],
            li: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
        },
        allowedInboundTags: {
            'spark-mention': ['data-object-type', 'data-object-id', 'data-group-type', 'data-object-url'],
            a: ['href'],
            b: [],
            blockquote: ['class'],
            div: [],
            span: ['class'],
            strong: [],
            i: [],
            em: [],
            u: [],
            pre: [],
            code: ['class'],
            br: [],
            hr: [],
            p: [],
            ul: [],
            ol: ['start'],
            li: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
        },
    },
    device: {
        body: {
            capabilities: {
                sdpSupported: true,
                groupCallSupported: true,
            },
            deviceType: 'WEB',
            localizedModel: 'DESKTOP',
            model: 'DESKTOP',
            systemName: 'DESKTOP',
            systemVersion: process.env.BUILD_VERSION || -1,
        },
        ephemeral: false,
    },
    encryption: {
        kmsInitialTimeout: 8000,
        kmsMaxTimeout: 40000,
        batcherMaxCalls: 30,
        caroots: null,
    },
    logger: {
        level: 'warn',
        clientLevel: 'info',
        separateLogBuffers: true,
        clientName: 'webex-web-client',
    },
    meetings: {
        enableRtx: true,
        metrics: {
            clientType: 'TEAMS_CLIENT',
        },
        reconnection: {
            enabled: true,
            autoRejoin: false,
        },
        experimental: {
            enableUnifiedMeetings: false,
            enableTurnDiscovery: false,
        },
        receiveReactions: true,
        enableAutomaticLLM: true,
    },
    presence: {
        initializeWorker: true,
    },
    /* storage: {
        boundedAdapter: new StorageAdapterWebClientStorage(boundedAdapterName),
        unboundedAdapter: new StorageAdapterWebClientStorage(WEBEX_WEB_CLIENT_UNBOUNDED),
    }, */
    services: {
        discovery: {
            u2c: urls.u2c,
        },
        validateDomains: true,
    },
    trackingIdPrefix: false ? 'ITCLIENT' : 'webex-web-client',
    trackingIdSuffix: false ? 'imu:false_imi:true' : '',
};

function configureWebex() {
    let webexInstance;
    try {
        webexInstance = new WebexCore({config: sdkConfig});
        webexInstance.util = {
            html: WebexHtmlUtil,
            image: WebexImageUtil,
        };
    } catch (error) {
        throw error;
    }
    return webexInstance;
}

const webex = configureWebex();
window.webex = webex;
export default webex;