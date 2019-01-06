import chatResolver from './chat';
import messageResolver from './message';
import userResolver from './user';
import merge from 'lodash.merge'


const resolvers = merge({},
chatResolver,
messageResolver,
userResolver
);

export default resolvers;
