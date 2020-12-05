ML Pipeline Server

- Data Sources
    - Tags
- Data Set Transforms
    - Crop
    - Color
    - Rotation
- Data Sets
- Compute Resources
- Model Templates
    - Model Selection
    - Params

Tables:
    user
        id
        name
        email
        password
    user_account
        id
        user_id
        account_id
    user_account_role
        user_id
        account_id
        account_role_id
    account
        id
        name
        icon
    account_role
        id
        name
    role_access
        role_id
        name
        level
    project
    datasource
    dataset