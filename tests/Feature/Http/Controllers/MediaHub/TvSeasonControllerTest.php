<?php
/**
 * NOTICE OF LICENSE.
 *
 * UNIT3D Community Edition is open-sourced software licensed under the GNU Affero General Public License v3.0
 * The details is bundled with this project in the file LICENSE.txt.
 *
 * @project    UNIT3D Community Edition
 *
 * @author     HDVinnie <hdinnovations@protonmail.com>
 * @license    https://www.gnu.org/licenses/agpl-3.0.en.html/ GNU Affero General Public License v3.0
 */

use App\Models\Season;
use App\Models\Tv;
use App\Models\User;

test('show returns an ok response', function (): void {
    $this->markTestIncomplete('This test case was generated by Shift. When you are ready, remove this line and complete this test case.');

    $season = Season::factory()->create();
    $tv = Tv::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('mediahub.season.show', ['id' => $id]));

    $response->assertOk();
    $response->assertViewIs('mediahub.tv.season.show');
    $response->assertViewHas('season', $season);
    $response->assertViewHas('show');

    // TODO: perform additional assertions
});

// test cases...
