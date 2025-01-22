import { ROLE } from '../../auth/enums/roles.enum';

// TODO: Implement the permissions as per your application requirements.
// Either fetch it from the server or define it in the client. if you have constant permissions, you can define it in below format and move this in core constants folder.
// If you have different structure, you have to modify the permissions setup as per your requirement in this file.

/**
 * The `appSetting` object contains the role-based permissions for the application.
 * The permission setup is based on the role-based access control (RBAC) model. In this model, permissions are assigned to roles, and roles are assigned to users.
 * For example, you can define the permissions in the following format:
 */
export const appSetting = {
  role: {
    [ROLE.ADMIN]: {
      create: {
        systems: true,
        trades: true,
        products: true,
        settings: true,
      },
      access: {
        systems: true,
        trades: true,
        products: true,
        settings: true,
      },
    },
    [ROLE.USER]: {
      create: {
        systems: false,
        trades: true,
        products: false,
        settings: false,
      },
      access: {
        systems: false,
        trades: true,
        products: false,
        settings: false,
      },
    },
  },
};
