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
} from '@chakra-ui/react';

import Player from 'src/entities/framework/player';

type IPlayerProfile = Player & {
    image?: string;
    info?: Map<string, string>;
    active: boolean;
} & ThemingProps & BoxProps;

export default function PlayerProfile(props: IPlayerProfile) {
    const {color, name, image, active, info, ...boxProps} = props;

    const boxStyle = {
        width: '180px',
        backgroundColor: useColorModeValue('white', 'gray.800'),
        boxShadow: active ? '2xl' : 'md',
        rounded: 'md',
        overflow: 'hidden',
        border: active ? '4px solid' : '0px solid',
        borderColor: useColorModeValue('brand.600', 'white'),
    }

    const gradientStyle = {
        height: '80px',
        width: 'full',
        backgroundGradient: 'linear(to-b,' + color + ',white)',
    }

    return (
        <Center py={6}>
            <Box {...boxProps} sx={boxStyle}>
                {/* Places a background layer with a gradient using the player's color */}
                <Box sx={gradientStyle} />

                {/* Places the avatar above the gradient */}
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={image}
                        name={name}
                        bgColor={color}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                {/* A text panel with the ... */}
                <Box p={6}>

                    {/* ... player's name ...*/}
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                    </Stack>
                    
                    {/* ... and player's info */}
                    {info &&
                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            {Array.from(info).map((value) => (
                            <Stack key={value[0]+name} spacing={0} align={'center'}>
                                <Text fontSize={'sm'} color={'gray.500'}>{value[0]}</Text>
                                <Text fontWeight={600}>
                                   {value[1]}
                                </Text>
                            </Stack>))}
                        </Stack>
                    }
                </Box>
            </Box>
        </Center>
    );
}