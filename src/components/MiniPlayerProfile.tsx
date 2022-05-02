import {
    Heading,
    Avatar,
    Box,
    Center,
    Flex,
    Text,
    Stack,
    useColorModeValue,
    ThemingProps,
    BoxProps,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
} from '@chakra-ui/react';

import Player from 'src/entities/framework/player';

type IPlayerProfile = Player & {
    image?: string;
    info?: Map<string, string>;
    active: boolean;
} & ThemingProps & BoxProps;

export default function PlayerProfile(props: IPlayerProfile) {
    const { color, name, image, active, info, ...boxProps } = props;
    // Use a disclosure to open the drawer
    const { isOpen, onOpen, onClose } = useDisclosure();

    const boxStyle = {
        width: 'full',
        backgroundColor: useColorModeValue('white', 'gray.800'),
        boxShadow: active ? '2xl' : 'md',
        rounded: 'md',
        overflow: 'hidden',
        border: active ? '4px solid' : '0px solid',
        borderColor: useColorModeValue('brand.600', 'white'),
        position: 'relative',
    };

    const headerStyle = {
        justifyContent: 'center',
        margin: '5px',
    };

    const avatarStyle = {
        border: '2px solid white',
        size: 'md',
    };

    return (
        <Center py={6}>
            <Box {...boxProps} sx={boxStyle} onClick={isOpen ? onClose : onOpen}>
                <Flex sx={headerStyle}>
                    <Avatar
                        size={'md'}
                        src={image}
                        name={name}
                        bgColor={color}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>
                
                <PlayerDrawer isOpen={isOpen} onClose={onClose} name={name} info={info}/>
            </Box>
        </Center>
    );
}

interface IDrawerProps {
    onClose: () => void,
    isOpen: boolean,
    name: string,
    info?: Map<string, string>,
}

function PlayerDrawer (props: IDrawerProps) {
    const { onClose, isOpen, name, info } = props;
    return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <Box p={6} bgColor="white">
                                <Stack spacing={0} align={'center'} mb={5}>
                                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                        {name}
                                    </Heading>
                                </Stack>

                                {info &&
                                    <Stack direction={'row'} justify={'center'} spacing={6}>
                                        {Array.from(info).map((value) => (
                                            <Stack key={"mini"+value[0]+name} spacing={0} align={'center'}>
                                                <Text fontSize={'sm'} color={'gray.500'}>{value[0]}</Text>
                                                <Text fontWeight={600}>
                                                    {value[1]}
                                                </Text>
                                            </Stack>))}
                                    </Stack>
                                }
                            </Box>
                        </DrawerBody>
                    </DrawerContent>

                </Drawer>
);
                            }