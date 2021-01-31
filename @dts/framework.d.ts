declare namespace framework {
    declare namespace di {
        export interface IDependencyProvider {
            (): any;
        }

        export interface IResolverRegistry {
            [key: string]: { [key: string]: IDependencyProvider }
        }
    }
}