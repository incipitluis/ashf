

export function splitContentInThree(content: string): string[] {
    const sentences = content
        .trim()
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => s + '.');

    const totalLength = content.length;
    const targetLength = Math.floor(totalLength / 3);

    const fragments: string[] = [];
    let currentFragment = '';

    for (const sentence of sentences) {
        if (
            fragments.length < 2 && 
            (currentFragment.length + sentence.length) > targetLength
        ) {
            fragments.push(currentFragment.trim());
            currentFragment = sentence;
        } else {
            currentFragment += ' ' + sentence;
        }
    }

    if (currentFragment) {
        fragments.push(currentFragment.trim());
    }

    return fragments;
}